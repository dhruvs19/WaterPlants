using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using svplants.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantsController : ControllerBase
    {
        private readonly PlantsDBContext _context;

        public PlantsController(PlantsDBContext context)
        {
            _context = context;
        }

        // GET: api/Plants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> GetPlants()
        {
            return await _context.Plants.ToListAsync();
        }

        // GET: api/Plants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> GetPlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id);

            if (plant == null)
            {
                return NotFound();
            }

            return plant;
        }

        // PUT: api/Plants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlant(int id, Plant plant)
        {
            plant.id = id;
            _context.Entry(plant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Plants/update_last_watered
        [HttpGet("update_last_watered/{id}")]
        public async Task<ActionResult<Plant>> UpdateLastWatered(int id) {
            Plant plant = await _context.Plants.FindAsync(id);
            DateTime dt = DateTime.Now;
            dt = new DateTime(dt.Ticks);
            TimeSpan tiff = dt.Subtract(plant.last_watered);
            if (tiff.TotalSeconds > 30) {
                plant.last_watered = dt;
                _context.Entry(plant).State = EntityState.Modified;

                try {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException) {
                    if (!PlantExists(id)) {
                        return NotFound();
                    }
                    else {
                        throw;
                    }
                }
               
            }
            return plant;
        }

        // POST: api/Plants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Plant>> PostPlant(Plant plant)
        {
            DateTime dt = DateTime.Now;
            dt = new DateTime(dt.Ticks);
            plant.last_watered = dt;
            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlant", new { id = plant.id }, plant);
        }

        // DELETE: api/Plants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null)
            {
                return NotFound();
            }

            _context.Plants.Remove(plant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlantExists(int id)
        {
            return _context.Plants.Any(e => e.id == id);
        }
    }
}
