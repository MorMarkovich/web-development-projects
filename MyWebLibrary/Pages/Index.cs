using MyWebLibrary.Pages.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyWebLibrary.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    private readonly SubscriberService _subscriberService;
    private readonly BookService _bookService;

    public IndexModel(ILogger<IndexModel> logger, SubscriberService subscriberService, BookService bookService)
    {
        _logger = logger;
        _subscriberService = subscriberService;
        _bookService = bookService;
    }

    public void OnGet()
    {
        if (string.IsNullOrEmpty(HttpContext.Session.GetString("UserId")))
        {
            Response.Redirect("/Login");
        }
    }
}