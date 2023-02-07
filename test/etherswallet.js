const EthersWallet = artifacts.require("EthersWallet");
const truffleAssert = require("truffle-assertions");

contract("EthersWallet", (accounts) => {
  it(`El balance inicial que debe tener el contrato es 0`, async () => {
    let ethersWalletInstance = await EthersWallet.deployed();
    let balance = await ethersWalletInstance.getBalance();
    assert.equal(balance, 0);
  });

  it("Debe ser el owner correcto", async () => {
    let contractInstance = await EthersWallet.deployed();
    await assert.equal(await contractInstance.getOwner(), accounts[0]);
  });

  it("Cuando se quiere retirar sin tener fondos debe avisar que no hay saldo", async () => {
    let contractInstance = await EthersWallet.deployed();
    await truffleAssert.reverts(
      contractInstance.withdrawAll(),
      "Lo sentimos, no tienes saldo"
    );
  });

  it(`Si no es owner no esta permitido hacer withdraw`, async () => {
    let EthersWalletInstance = await EthersWallet.deployed();
    await truffleAssert.reverts(
      EthersWalletInstance.withdrawAll.call({ from: accounts[1] }),
      "Ownable: caller is not the owner"
    );
  });
});
