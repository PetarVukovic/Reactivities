using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activites;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using FluentValidation;
using FluentValidation.AspNetCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        //iconfiguration ce nam dati pristup od json settings
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration config)//this znaci services od services
        {
            // Add services to the container.

            
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>//radi novu instancu datacontext i tada mozemo query our DB
            (opt=>
            {

                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt=>{
                opt.AddPolicy("CorsPolicy",policy=>{
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler));

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);//registrira sve mapping profiles
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
             return services;
        }
    }
}