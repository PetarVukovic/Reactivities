using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activites;
namespace API.Controllers
{
    public class ActivitiesController:BaseApiController//znaci da nasljeduje api atribut i rutu
    {
      
       
          

        [HttpGet]//api/activities
        public async Task<ActionResult<List<Activity>>>GetActivities()
        {
            return await Mediator.Send(new List.Query());//api SENDING REQUEST VIA MEDIATOR 
            //INSIDE OUR APPLICATION PROJECT 
        }

        [HttpGet("{id}")]//api/activities/id
        public async Task<ActionResult<Activity>>GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id} );//incijaliziramo i instanciramo novzu klasu 
        }
        [HttpPost]
        // ne vracamo nista u tesku iactionresult vraca samo Ok ,bad request,not found etc.
        //on je pametan da pogleda objekt koji mu je prosljeden
        public async Task<IActionResult>CreateActivity(Activity activity){

            return Ok(await Mediator.Send(new Create.Command{Activity=activity}));
        }
        [HttpPut("{id")]
         public async Task<IActionResult>EditActivity(Guid id,Activity activity)
         {
            activity.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Activity=activity}));

         }
         [HttpDelete("{id")]
         public async Task<IActionResult>DeleteActivity(Guid id)
         {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
         }
    }
}