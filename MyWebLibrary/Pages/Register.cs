using MyWebLibrary.Pages.Models;
using MyWebLibrary.Pages.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace MyWebLibrary.Pages;

public class RegisterModel : PageModel
{
    private readonly UserService _userService;

    public RegisterModel(UserService userService)
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

    [BindProperty]
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    public string ErrorMessage { get; set; }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        var existingUser = await _userService.GetByUsernameAsync(Username);

        if (existingUser != null)
        {
            ErrorMessage = "Username already exists";
            return Page();
        }

        var user = new User
        {
            Username = Username,
            Password = Password,
            Email = Email
        };

        await _userService.CreateAsync(user);

        return RedirectToPage("/Login");
    }
}