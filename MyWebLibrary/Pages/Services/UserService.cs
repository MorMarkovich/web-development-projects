using MyWebLibrary.Pages.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MyWebLibrary.Pages.Services;

public class UserService
{
    private readonly IMongoCollection<User> _users;

    public UserService(IOptions<UserDatabaseSettings> UserDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            UserDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            UserDatabaseSettings.Value.DatabaseName);

        _users = mongoDatabase.GetCollection<User>(
            UserDatabaseSettings.Value.CollectionName);
    }

    public async Task<User> GetByUsernameAsync(string username) =>
        await _users.Find<User>(user => user.Username == username).FirstOrDefaultAsync();

    public async Task<User> GetByEmailAsync(string email) =>
        await _users.Find<User>(user => user.Email == email).FirstOrDefaultAsync();

    public async Task<User> CreateAsync(User user)
    {
        await _users.InsertOneAsync(user);
        return user;
    }
}