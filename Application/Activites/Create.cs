using System;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
namespace Application.Activites
{
    public class Create
    {
        public class Command:IRequest<Result<Unit>>//komand nista nevraca ali je doro da vrati result da vidimo kako je request prosa
        {
            public Activity Activity{get; set;}
        }
        public class CommandValidation:AbstractValidator<Command>
        {
            
            public CommandValidation ()
            {
                RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());
                
            }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
        private readonly DataContext _context;
            public Handler ( DataContext context)
            {
            _context = context;

            }
            //our rquest should hold activity object
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);//only adding activities in memory we dont touch database 
               var result= await _context.SaveChangesAsync()>0;//ako nista nije vraceno uDB onda ce result biti false,ako je broj prfomjena veci od nula bit ce true
               if(!result)return Result<Unit>.Failure("Failed to cretae activity");
                return Result<Unit>.Success(Unit.Value);//unit.valu je nista sam ogovori da je sve OK ako je prslo
            }
        }

    }
}