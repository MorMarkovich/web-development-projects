using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MyWebLibrary.Pages.Models;

public class Book
{
    [BsonId]
    public string Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Genre { get; set; }
}
