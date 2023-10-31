using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MyWebLibrary.Pages.Models;

 public class Subscriber
 {
     [BsonId]
     public string Id { get; set; }
     public string FirstName { get; set; }
     public string LastName { get; set; }
     public List<string> BorrowedBookIds { get; set; } = new List<string>();
 }