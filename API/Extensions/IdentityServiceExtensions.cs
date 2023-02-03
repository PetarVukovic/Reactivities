using System.Text;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,IConfiguration config)
        {

            services.AddIdentityCore<AppUser>(opt=>{
                opt.Password.RequireNonAlphanumeric=false;
                opt.User.RequireUniqueEmail=true;
               


            })
            .AddEntityFrameworkStores<DataContext>();//Dopusta nam query app user i nDB
       

            var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt=>{
                opt.TokenValidationParameters=new TokenValidationParameters
                {
                    ValidateIssuerSigningKey=true,
                    IssuerSigningKey=key,
                    ValidateIssuer=false,
                    ValidateAudience=false
                };
            });

            services.AddScoped<TokenService>();//Kad http request dodde ,idemo u account controller i trazimo token koji  cemo se ulogirat
            //Kad http requeest zavrsi odbacit cemo tokenservice

            return services;

        }

    }
}

