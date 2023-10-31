using MyWebLibrary.Pages.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MyWebLibrary.Pages.Services;

public class BookService
{
    private readonly IMongoCollection<Book> _books;

    public BookService(IOptions<BookDatabaseSettings> BookDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            BookDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            BookDatabaseSettings.Value.DatabaseName);

        _books = mongoDatabase.GetCollection<Book>(
            BookDatabaseSettings.Value.CollectionName);
    }
    public async Task<List<Book>> GetAsync() => await _books.Find(book => true).ToListAsync();

    public async Task<Book> GetAsync(string id) => await _books.Find<Book>(book => book.Id == id).FirstOrDefaultAsync();

    public async Task<Book> CreateAsync(Book book)
    {
        await _books.InsertOneAsync(book);
        return book;
    }
    public async Task<bool> IsBookExistAsync(string id) => await _books.CountDocumentsAsync(book => book.Id == id) > 0;
    public async Task RemoveAsync(Book bookIn) => await _books.DeleteOneAsync(book => book.Id == bookIn.Id);
}