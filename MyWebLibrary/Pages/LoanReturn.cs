using MyWebLibrary.Pages.Models;
using MyWebLibrary.Pages.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyWebLibrary.Pages;

public class LoanReturnModel : PageModel
{
    private readonly SubscriberService _subscriberService;
    private readonly BookService _bookService;

    public LoanReturnModel(SubscriberService subscriberService, BookService bookService)
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
    public async Task<IActionResult> OnPostLoanBookAsync(string SubscriberId, string BookId)
    {
        if (await _subscriberService.IsSubscriberExistAsync(SubscriberId))
        {
            if (await _bookService.IsBookExistAsync(BookId))
            {
                var subscriber = await _subscriberService.GetAsync(SubscriberId);
                if (subscriber != null && subscriber.BorrowedBookIds.Count < 3)
                {
                    subscriber.BorrowedBookIds.Add(BookId);
                    await _subscriberService.UpdateAsync(SubscriberId, subscriber);
                    TempData["SuccessMessage"] = "Book Successfuly taken.";
                    return RedirectToPage();
                }
                else
                {
                    TempData["ErrorMessageBookTake"] = "You can take up to 3 books only.";
                    return RedirectToPage();
                }
            }
            TempData["ErrorMessageBook"] = "Book not exists.";
            return RedirectToPage();
        }
        TempData["ErrorMessageSub"] = "Subscriber not exists.";
        return RedirectToPage();
    }

    public async Task<IActionResult> OnPostReturnBookAsync(string SubscriberId, string BookId)
    {
        if (await _subscriberService.IsSubscriberExistAsync(SubscriberId))
        {
            if (await _bookService.IsBookExistAsync(BookId))
            {
                var subscriber = await _subscriberService.GetAsync(SubscriberId);
                if (subscriber != null && subscriber.BorrowedBookIds.Contains(BookId))
                {
                    subscriber.BorrowedBookIds.Remove(BookId);
                    await _subscriberService.UpdateAsync(SubscriberId, subscriber);
                    TempData["SuccessMessage"] = "Book Successfuly return.";
                    return RedirectToPage();
                }
                else
                {
                    TempData["ErrorMessageBookRemove"] = "No more books can be returned.";
                    return RedirectToPage();
                }
            }
            TempData["ErrorMessageBook"] = "Book not exists.";
            return RedirectToPage();
        }
        TempData["ErrorMessageSub"] = "Subscriber not exists.";
        return RedirectToPage();
    }
}