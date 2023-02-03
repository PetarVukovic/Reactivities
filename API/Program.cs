
using Microsoft.EntityFrameworkCore;
using Persistence;
using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

var builder = WebApplication.CreateBuilder(args);

//sad ce svaki kontroler endpoint zahtjevat autentifikaciju
builder.Services.AddControllers(opt=>{
    var policy=new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);



var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
using var scope=app.Services.CreateScope();//kako bi mogli pristupiti servicu
//kad http requeest zavrsi mi raspolazemo datacontext 
var services=scope.ServiceProvider;
//zelimo da nasa aplikacija automatski kreira i updata tablice i da 
try
{
    var context=services.GetRequiredService<DataContext>();
   var userManager=services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();//napravit ce bazu novu ako nije vec ,isot await jer se prvo treba napravit prije nego sto skoci na drugu metodu
    await Seed.SeedData(context,userManager);//pozivamo staticnu metodu (await pricekaj da se izvrsi onda kreni dalje jer je asinkroni task)
}
catch (Exception ex)
{
    
    var logger=services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex,"An error occured during migration");
}

app.Run();
