
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activites
{
    public class Edit
    {
        public class Command:IRequest<Result<Unit>>
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
        private readonly IMapper _mapper;
        
            public Handler (DataContext context,IMapper mapper)
            {
            _mapper = mapper;
                _context=context;
            
            }
            public async  Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
           
                var  activity=await _context.Activities.FindAsync(request.Activity.Id);
                if(activity==null)return null;
                _mapper.Map(request.Activity,activity);//uzima sve propertiesw iz prvog argumenta i updata ih u drugi
              var result= await _context.SaveChangesAsync()>0;
                if(!result) return Result<Unit>.Failure("Failed to update activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}