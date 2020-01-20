const Multichainer = require('./multichainer.js');
const { Account: LoomAccount } = require ('./loom/index.js');

var Account = function(address, accountType) {
    this.address = address.toString();
    this.accountType = accountType;
};

Account.TYPE = {
    LOOM: 'LOOM',
    ETHEREUM: 'ETHEREUM'
};

Account.prototype.setKeyPair = function(privateKey, publicKey) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
};


Account.validateAccountType = function(type) {
    if (Account.TYPE[type] === undefined) {
        throw "Invalid Account type: "+type;
    }
};

/**
 * Creates an account of a given type from a privatekey
 *
 * TODO make accountType parameter optional, and detect by multichainer object
 */
Account.fromPrivateKeyFile = function(path, accountType) {
    Account.validateAccountType(accountType);

    // todo validate path
    if (accountType === Account.TYPE.LOOM) {

        let loomAccount = LoomAccount.fromPrivateKeyFile(path);

        let account = new Account(loomAccount.address, accountType);
        account.setKeyPair(loomAccount.privateKey, loomAccount.publicKey);

        return account;
    }

    return new Account();
};


/**
 * Creates a random account
 *
 * TODO make accountType parameter optional, and detect by multichainer object
 */
Account.getRandom = function(accountType) {
    Account.validateAccountType(accountType);

    // todo validate path
    if (accountType === Account.TYPE.LOOM) {
        const { Account: LoomAccount } = require ('./loom/index.js');

        let loomAccount = LoomAccount.getRandom();

        let account = new Account(loomAccount.address, accountType);
        account.setKeyPair(loomAccount.privateKey, loomAccount.publicKey);

        return account;
    }

    return new Account();
};


module.exports = Account;
