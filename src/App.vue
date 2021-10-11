<template>
  <div id="app">
    <header>
    <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      
        <span class="fs-4">Learn Token</span>
      

     <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
         <div class="c_topbar">
        <button id="btn" class="w-100 btn btn-lg btn-primary" @click="connect" type="button">Connect</button>
        <div id='address'></div>

        </div>
      </nav>
      <div></div>
    </div>
    <div id="warning" class="alert alert-danger hide" role="alert"></div>
    <div id="info" class="alert alert-info hide" role="alert"></div>
    </header>
    <div class="container py-3">
    <header>
      <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-4 fw-normal">My First DAPP</h1>
      </div>
    </header>

    <main>
    <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Stake Details</h1>
            <p class="lead text-muted" id="detail"></p>
            
          </div>
        </div>
      </section>

      <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">Beginner</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">5000<small class="text-muted fw-light">LRN</small></h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>Feature 1</li>
                <li>Feature 2</li>
                
              </ul>
              <button type="button" class="w-100 btn btn-lg btn-outline-primary" @click="bignner">Unlock</button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">Professional</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">10000<small class="text-muted fw-light">LRN</small></h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
                
                
              </ul>
              <button type="button" class="w-100 btn btn-lg btn-primary" @click="professional">Unlock</button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm border-primary">
            <div class="card-header py-3 text-white bg-primary border-primary">
              <h4 class="my-0 fw-normal">Expert</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">25000<small class="text-muted fw-light">LRN</small></h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
                <li>Feature 4</li>
              </ul>
              <button type="button" class="w-100 btn btn-lg btn-primary" @click="expert">Unlock</button>
            </div>
          </div>
        </div>
      </div>

      
      </main>

    </div>
    
  </div>
</template>


<script>
/* eslint-disable */
// import Topbar from './components/topbar.vue';
//import Menu from './components/menu.vue';
import Web3 from 'web3';
import ABI from './contracts/learnstakecontract'
const contractAddress = '0x0E600bC9850dc8C5b915F42988f6eBCBfd475fB3';
const web3 = new Web3(window.web3.currentProvider);
const myContract =  new web3.eth.Contract(ABI, contractAddress);

//check if account is changed in metamask
window.ethereum.on('accountsChanged', function (accounts) {
  getAccount();

});

export default {
  name: 'App',

  components: {
   
  },
  data(){
            return {
                msg: "My First DAPP"
            }
        },
  methods:{

          bignner(){
            unLockMembershp(5000, "Bigenner");
          },
          professional(){
            unLockMembershp(10000,"Professional");
          },
          expert(){
            unLockMembershp(25000,"Expert");
          },
          withdraw(){
              alert('withdraw');
          },
          connect(){
                try{
                         
                    if(document.getElementById("btn").innerText == "Connected")
                    {
                        alert("Already Connected");
                        return;
                    }
                    getAccount();
 
                }
                catch(error){
                    // if user cancels metamask request 
                    if (error.code === 4001){
                        console.log('Metamask Connection Cancelled');
                    }
                    else {
                        console.log(error);
                        // if unable to requst account prompt to install metamask
                        alert('Install Metamask to Connect');
                    }
                }
            }

      }
}
// withdraw  stakes
async function withdraw(amount)
{
  
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  await myContract.methods.withdrawStake(amount).send({from:account});
  getAccountDetail(account);

}

// get account detail
async function getAccountDetail(myAddress)
{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
      if(accounts[0] != myAddress)
      {
        console.log("ERROR: connect metamask again!");
      }

      const hasStakes = await myContract.methods.hasStake(myAddress).call(); 
      
      const tokenName = await myContract.methods.name().call();
      const accBalance = await myContract.methods.balanceOf(myAddress).call();

      var membershipType = "Not a Member"; 
    
        if(hasStakes >=5000 && hasStakes < 10000)
        {
            membershipType = "Beginner";
        }
        else if(hasStakes >= 10000 && hasStakes < 25000)
        {
            membershipType = "Professional";
        }
        else if(hasStakes >= 25000)
        {
          membershipType = "Expert";
        }
  
      document.getElementById("detail").innerHTML = "Token Name : "+ tokenName +"<br/> Current Stakes: " + hasStakes +"<br /> Current Membership Type: " + membershipType;
      document.getElementById("detail").innerHTML += "<br/> Account Balnce: "+web3.utils.fromWei(accBalance, 'ether') ;
      document.getElementById("detail").innerHTML += "<button id=\"withdraw\" type=\"button\" class=\"w-100 btn btn-lg btn-primary\" >Withdraw Stakes</button>";
      document.getElementById("withdraw").addEventListener("click", function(){withdraw(hasStakes)},false);
      


}

// get account info
  async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    document.getElementById("btn").innerText = "Connected";
    document.getElementById("address").innerHTML = "Account Connected : "+account;
    getAccountDetail(account);
    
    }

// unlock membership based on type 
 async function unLockMembershp(amount, memberType) 
 {
   if(document.getElementById("btn").innerText == "Connect")
    {
      document.getElementById("warning").innerHTML = "First connect with MetaMask using <b>Connect</b> Button!";
      document.getElementById("warning").style.display = "block";
    }
    else
    {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      
      var balance = await myContract.methods.balanceOf(account).call();
      var _balance = web3.utils.fromWei(balance, 'ether');

      if(_balance < amount)
      {
        var reqAmount =  amount-_balance ;

        document.getElementById("warning").innerHTML = "Insufficient Balance for "+memberType+" Membership, buy "+reqAmount+"  LRN Tokens!";
        document.getElementById("warning").style.display = "block";
        
      }
      else // Stake 
      {
         const hasStakes = await myContract.methods.hasStake(account).call(); 

         //check if already staked.
        if(hasStakes > 0)
        {
           document.getElementById("info").innerHTML = "Already staked "+hasStakes +" Tokens!";
          document.getElementById("info").style.display = "block";
        }
        else // if not already staked
        {
          console.log(myContract);
           var msgSender = await myContract.methods.getSender().call();
           console.log("message sender :"+msgSender);
           var msgSenderBalance = await myContract.methods.getSenderBalance().call();
           console.log("message sender balance");

          console.log(amount);
          try{
             
              var staked = await myContract.methods.stake(amount).send({from:account});
              document.getElementById("info").innerHTML = "Membership Unlocked Successfully!";
              document.getElementById("info").style.display = "block";
          }
          catch(e)
          {
              console.log(e);
          }
          console.log(web3.utils.toWei(amount.toString(),'ether'));
        }

      } 
      
      getAccountDetail(account);
 
    }
  
  //  return learnContract;
}



/* eslint-enable */
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}


.hide{
  display: none;

}
</style>
