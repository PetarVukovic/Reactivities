using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController:BaseApiController//znaci da nasljeduje api atribut i rutu
    {
        //sada radimo enpointove.Znamo da zelimo query our db
        //to znaci da trebamo iskoristiti DI KAKO BI inject our data context inside our API CONTROLLER CLASS
        private readonly DataContext _context;
            //kad http request dode i nasa main klasa zna gdje treba ici prosljedit ce ga activities kontroleru 
            //stoga ce kreirat novu instancu kojoj treba datacontext ,stoga ce se instacirati nova datacontext instanca 
            //koja ce biti dostupna unutar ove nase klase u _cotext
        public ActivitiesController(DataContext context)
        {
            _context = context;
            
        }
        [HttpGet]//api/activities
        public async Task<ActionResult<List<Activity>>>GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]//api/activities/id
        public async Task<ActionResult<Activity>>GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}