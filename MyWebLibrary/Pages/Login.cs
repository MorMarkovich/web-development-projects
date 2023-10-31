using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using MyWebLibrary.Pages.Services;

namespace MyWebLibrary.Pages;

public class LoginModel : PageModel
{
    private readonly UserService _userService;

    public LoginModel(UserService userService)
    {
        _userService = userService;
    }

    [BindProperty]
    [Required]
    public string Username { get; set; }

    [BindProperty]
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    public string ErrorMessage { get; set; }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }
        var user = await _userService.GetByUsernameAsync(Username);

        if (user != null && user.Password == Password)
        {
            HttpContext.Session.SetString("UserId", user.Id);
            return RedirectToPage("/Index");
        }
        else
        {
            ErrorMessage = "Invalid username or password";
            return Page();
        }
    }
}