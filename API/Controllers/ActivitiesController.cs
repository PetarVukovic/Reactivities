using System;
using Application.Activites;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;
namespace API.Controllers
{
    public class ActivitiesController:BaseApiController//znaci da nasljeduje api atribut i rutu
    {
      

        [HttpGet]//api/activities
        public async Task<IActionResult>GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));//api SENDING REQUEST VIA MEDIATOR 
            //INSIDE OUR APPLICATION PROJECT 
        }
        

        [HttpGet("{id}")]//api/activities/id
        public async Task<IActionResult>GetActivity(Guid id)
        {
            var result=await Mediator.Send(new Details.Query{Id=id} );//incijaliziramo i instanciramo novzu klasu 
          return HandleResult(result);
        }
        [HttpPost]
        // ne vracamo nista u tesku iactionresult vraca samo Ok ,bad request,not found etc.
        //on je pametan da pogleda objekt koji mu je prosljeden
        public async Task<IActionResult>CreateActivity(Activity activity)
        {

            return HandleResult(await Mediator.Send(new Create.Command{Activity=activity}));
        }
        [HttpPut("{id}")]
         public async Task<IActionResult>EditActivity(Guid id,Activity activity)
         {
            activity.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity=activity}));

         }
         [HttpDelete("{id}")]
         public async Task<IActionResult>DeleteActivity(Guid id)
         {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
         }
    }
}