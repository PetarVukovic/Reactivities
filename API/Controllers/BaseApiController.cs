using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController:ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator =>_mediator ??=
        HttpContext.RequestServices.GetService<IMediator>();
        //?? ako je nula onda ono sto je s desna dodjeli Mediatoru 
    }
}