using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult RequestAccount()
        {
            return View();
        }

        public IActionResult FindAccount()
        {
            return View();
        }

        public IActionResult NewPassword()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            return RedirectToAction("AdminHome");
        }

        //Profiles for all users
        public IActionResult Profile()
        {
            return View();
        }
        // ADMIN
        public IActionResult AdminHome()
        {
            return View();
        }

        public IActionResult AdminPasses()
        {
            return View();
        }

        public IActionResult AdminUsers()
        {
            return View();
        }

        public IActionResult AdminFacilities()
        {
            return View();
        }
        public IActionResult AdminServices()
        {
            return View();
        }
        public IActionResult AdminTransactions()
        {
            return View();
        }

        // STAFF

        public IActionResult StaffPasses()
        {
            return View();
        }

        public IActionResult StaffServices()
        {
            return View();
        }

        public IActionResult StaffTransactions()
        {
            return View();
        }

        //HOMEOWNER
        public IActionResult HomeownerHome()
        {
            return View();
        }

        public IActionResult HomeownerFacilities()
        {
            return View();
        }

        public IActionResult HomeownerPasses()
        {
            return View();
        }

        public IActionResult HomeownerTransactions()
        {
            return View();
        }
    }
}
