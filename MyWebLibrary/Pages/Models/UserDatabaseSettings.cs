namespace MyWebLibrary.Pages.Models;

 public class UserDatabaseSettings
 {
     public string? CollectionName { get; set; } = "Users";
     public string? ConnectionString { get; set; } = "mongodb://localhost:27017";
     public string? DatabaseName { get; set; } = "Library";
 }