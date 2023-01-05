using Microsoft.EntityFrameworkCore;
using Persistence;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>//radi novu instancu datacontext i tada mozemo query our DB
(opt=>
{

    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
using var scope=app.Services.CreateScope();//kako bi mogli pristupiti servicu
//kad http requeest zavrsi mi raspolazemo datacontext 
var services=scope.ServiceProvider;
//zelimo da nasa aplikacija automatski kreira i updata tablice i da 
try
{
    var context=services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();//napravit ce bazu novu ako nije vec ,isot await jer se prvo treba napravit prije nego sto skoci na drugu metodu
    await Seed.SeedData(context);//pozivamo staticnu metodu (await pricekaj da se izvrsi onda kreni dalje jer je asinkroni task)
}
catch (Exception ex)
{
    
    var logger=services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex,"An error occured during migration");
}

app.Run();
