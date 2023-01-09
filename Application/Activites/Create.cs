using System;
using Domain;
using MediatR;
using Persistence;
namespace Application.Activites
{
    public class Create
    {
        public class Command:IRequest//komand nista nevraca zato u irequestu necemo nista korstiti
        {
            public Activity Activity{get; set;}
        }
        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
            public Handler ( DataContext context)
            {
            _context = context;

            }
            //our rquest should hold activity object
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);//only adding activities in memory we dont touch database 
                await _context.SaveChangesAsync();
                return Unit.Value;//samo govorimo API kontrolleru da je request zavrsio tj. nevraca nista
            }
        }

    }
}