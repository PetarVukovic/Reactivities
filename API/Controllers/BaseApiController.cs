using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class BaseApiController:ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator =>_mediator ??=
        (HttpContext.RequestServices.GetService<IMediator>());
        //?? ako je nula onda ono sto je s desna dodjeli Mediatoru 
    }
}


