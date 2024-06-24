
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;


public class Contadbcontext{
    private readonly DynamoDBContext _context;

    public Contadbcontext(IAmazonDynamoDB dynamoDB)
    {
        _context = new DynamoDBContext(dynamoDB);
    }

    public async Task SaveContaAsync(Conta conta){
        await _context.SaveAsync(conta);
    }

    public async Task<Conta> GetContaAsync(int numero_conta){
        return await _context.LoadAsync<Conta>(numero_conta);
    }

      public async Task DeleteContaAsync(int numero_conta)
    {
        await _context.DeleteAsync<Conta>(numero_conta);
    }

    public async Task<List<Conta>> GetAllContasAsync()
    {
        var conditions = new List<ScanCondition>();
        return await _context.ScanAsync<Conta>(conditions).GetRemainingAsync();
    }
}