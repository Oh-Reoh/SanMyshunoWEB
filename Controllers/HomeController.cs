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
    }
}
