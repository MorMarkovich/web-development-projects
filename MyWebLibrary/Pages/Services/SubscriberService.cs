using MyWebLibrary.Pages.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MyWebLibrary.Pages.Services;

public class SubscriberService
{
    private readonly IMongoCollection<Subscriber> _subscribers;

    public SubscriberService(IOptions<SubscriberDatabaseSettings> SubscriberDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            SubscriberDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(
            SubscriberDatabaseSettings.Value.DatabaseName);
        _subscribers = mongoDatabase.GetCollection<Subscriber>(
            SubscriberDatabaseSettings.Value.CollectionName);
    }
    public async Task<List<Subscriber>> GetAsync() => await _subscribers.Find(subscriber => true).ToListAsync();

    public async Task<Subscriber> GetAsync(string id) => await _subscribers.Find<Subscriber>(subscriber => subscriber.Id == id).FirstOrDefaultAsync();

    public async Task<Subscriber> CreateAsync(Subscriber subscriber)
    {
        try
        {
            await _subscribers.InsertOneAsync(subscriber);
            return subscriber;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
    public async Task<bool> IsSubscriberExistAsync(string id) => await _subscribers.CountDocumentsAsync(Subscriber => Subscriber.Id == id) > 0;
    public async Task UpdateAsync(string id, Subscriber subscriberIn) => await _subscribers.ReplaceOneAsync(subscriber => subscriber.Id == id, subscriberIn);

    public async Task RemoveAsync(Subscriber subscriberIn) => await _subscribers.DeleteOneAsync(subscriber => subscriber.Id == subscriberIn.Id);
}
