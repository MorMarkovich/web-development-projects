using MyWebLibrary.Pages.Models;
using MyWebLibrary.Pages.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyWebLibrary.Pages;

public class ManageLibraryModel : PageModel
{
    private readonly SubscriberService _subscriberService;
    private readonly BookService _bookService;

    [BindProperty]
    public Subscriber Subscriber { get; set; }

    [BindProperty]
    public Book Book { get; set; }

    public ManageLibraryModel(SubscriberService subscriberService, BookService bookService)
    {
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
    public async Task<IActionResult> OnPostAddSubscriberAsync()
    {
        if( await _subscriberService.IsSubscriberExistAsync(Subscriber.Id))
        {
            TempData["ErrorMessageSub"] = "Subscriber with the given key already exists.";
            return RedirectToPage();
        }
        else
        {
            TempData["MessageSubAdd"] = "The subscriber added";
            await _subscriberService.CreateAsync(Subscriber);
            return RedirectToPage();
        }
    }
    public async Task<IActionResult> OnPostDeleteSubscriberAsync()
    {
        TempData["MessageSubDel"] = "The subscriber removed";
        await _subscriberService.RemoveAsync(Subscriber);
        return RedirectToPage();
    }
    public async Task<IActionResult> OnPostAddBookAsync()
    {
        if (await _bookService.IsBookExistAsync(Book.Id))
        {
            TempData["ErrorMessageBook"] = "Book with the given key already exists.";
            return RedirectToPage();
        }
        else
        {
            TempData["MessageBAdd"] = "The book added";
            await _bookService.CreateAsync(Book);
            return RedirectToPage();
        } 
    }
    public async Task<IActionResult> OnPostDeleteBookAsync()
    {
        TempData["MessageBDel"] = "The book removed";
        await _bookService.RemoveAsync(Book);
        return RedirectToPage();
    }
}
