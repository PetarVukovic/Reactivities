using System;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Application.Core;

namespace Application.Activites
{
    public class List
    {
        public class Query:IRequest<Result<List<Activity>>>{}
        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            //treba nam i konstruktor preko kojeg cemo instancirati datacontext
        private readonly DataContext _context;
           

            public Handler(DataContext context)
            {
            _context = context;
          
            }
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
              
                return  Result<List<Activity>>.Success(await _context.Activities.ToListAsync());// vraca data kojeg smo specificirali preko irequest interafce
            }
        }
    }
}