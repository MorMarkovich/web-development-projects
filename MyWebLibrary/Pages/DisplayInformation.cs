using MyWebLibrary.Pages.Models;
using MyWebLibrary.Pages.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyWebLibrary.Pages;

public class DisplayInformationModel : PageModel
{
    private readonly SubscriberService _subscriberService;
    private readonly BookService _bookService;

    [BindProperty(SupportsGet = true)]
    public string SearchQuery { get; set; }
    public IList<Subscriber> Subscribers { get; set; }
    public IList<Book> Books { get; set; }

    public DisplayInformationModel(SubscriberService subscriberService, BookService bookService)
    {
        _subscriberService = subscriberService;
        _bookService = bookService;
    }
    public IList<Book> SearchBooks(string searchQuery)
    {
        return Books.Where(book => book.Title.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) || book.Author.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)).ToList();
    }
    public IList<Subscriber> SearchSubscribersById(string searchQuery)
    {
        return Subscribers.Where(subscriber => subscriber.Id.ToString() == searchQuery).ToList();
    }
    public async Task OnGetAsync()
    {
        if (string.IsNullOrEmpty(HttpContext.Session.GetString("UserId")))
        {
            Response.Redirect("/Login");
        }

        Subscribers = await _subscriberService.GetAsync();
        Books = await _bookService.GetAsync();

        if (!string.IsNullOrEmpty(SearchQuery))
        {
            Subscribers = SearchSubscribersById(SearchQuery);
        }
        if(!string.IsNullOrEmpty(SearchQuery))
        {
            Books = SearchBooks(SearchQuery);
        }
    }
} 