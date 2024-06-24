using Amazon.DynamoDBv2.DataModel;


[DynamoDBTable("Controle_Pix")]
public class Conta{

    [DynamoDBHashKey]
    public int numero_conta{ get; set; }

    [DynamoDBProperty]
    public string numero_agencia{ get; set; }

    [DynamoDBProperty]
    public string documento{ get; set; }

    [DynamoDBProperty]
    public double limite_pix { get; set; }
}