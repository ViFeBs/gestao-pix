

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("transacao/[controller]")]
public class ContaController : Controller {
    private readonly Contadbcontext _context;

    public ContaController(Contadbcontext context){
        _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Conta>> Get(){
        return await _context.GetAllContasAsync();
    }

    [HttpGet("{numero_conta}")]
    public async Task<ActionResult<Conta>> Get(int numero_conta){
        var conta = await _context.GetContaAsync(numero_conta);
        if(conta == null){
            return NotFound();
        }
        return conta;
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody]Conta conta)
    {
        await _context.SaveContaAsync(conta);
        return CreatedAtAction(nameof(Get), new { numero_conta = conta.numero_conta }, conta);
    }

    [HttpPut("{numero_conta}")]
    public async Task<ActionResult<Conta>> Put(int numero_conta, [FromBody]Conta conta){
        var contaexistente = await _context.GetContaAsync(numero_conta);
        if (contaexistente == null)
        {
            return NotFound();
        }

        conta.numero_conta = numero_conta;
        await _context.SaveContaAsync(conta);
        return NoContent();
    }

    [HttpDelete("{numero_conta}")]
    public async Task<IActionResult> Delete(int numero_conta)
    {
        var contaexistente = await _context.GetContaAsync(numero_conta);
        if (contaexistente == null)
        {
            return NotFound();
        }

        await _context.DeleteContaAsync(numero_conta);
        return NoContent();
    }

}