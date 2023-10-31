using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using MyWebLibrary.Pages.Services;
using System.Net.Mail;
using System.Net;

namespace MyWebLibrary.Pages;

public class ForgotPasswordModel : PageModel
{
    private readonly UserService _userService;
    private readonly ILogger<ForgotPasswordModel> _logger;

    public ForgotPasswordModel(UserService userService, ILogger<ForgotPasswordModel> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    [BindProperty]
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    public string ErrorMessage { get; set; }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            _logger.LogWarning("Model state is invalid.");
            return Page();
        }

        _logger.LogInformation("Retrieving user by email: {Email}", Email);
        var user = await _userService.GetByEmailAsync(Email);

        if (user != null)
        {
            // Send email with username and password
            try
            {
                _logger.LogInformation("Sending email to {Email}", Email);
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("marpikud@gmail.com", "daqu khjk mojg knlo"),
                    EnableSsl = true,
                };

                smtpClient.Send("marpikud@gmail.com", Email, "Your Username and Password",
                    $"Username: {user.Username}\nPassword: {user.Password}");

                _logger.LogInformation("Email sent successfully to {Email}", Email);
                return RedirectToPage("/Login");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email to {Email}", Email);
                ErrorMessage = "Failed to send email. Please try again later.";
                return Page();
            }
        }
        else
        {
            _logger.LogWarning("No account found with email: {Email}", Email);
            ErrorMessage = "No account found with the provided email address.";
            return Page();
        }
    }
}