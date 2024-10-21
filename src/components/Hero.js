import React, { useState, useContext, useEffect } from 'react'
// Import Web3
import Web3 from 'web3'
//Styles
import '../styles/Hero.css'
//Context
import { UserContext } from '../contexts/User'
//Components
import WalletConnect from './frontendBoilerplate/WalletConnect'
import InfoBoxConnected from './InfoBoxConnected'
//Utils
import { privateFactory } from '../utils/helpers' // Assuming this is the contract address
import FactoryABI from '../utils/privateFactoryABI.json' // ABI of the private factory contract
import FlexABI from '../utils/FlexABI.json' // ABI of the Flex contract

function Hero() {
  // Context
  const userData = useContext(UserContext)

  // Initialize Web3 and set the provider (MetaMask or other provider)
  const [privateFactoryContract, setPrivateFactoryContract] = useState(null)
  const [flexContract, setFlexContract] = useState(null) // For the Flex contract
  const [userAccount, setUserAccount] = useState('')
  const [oracleAddress, setOracleAddress] = useState('') // For user input of oracle address
  const [isConnectedToFlex, setIsConnectedToFlex] = useState(false) // To track connection to Flex

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        if (window.ethereum) {
          // Request account access from MetaMask
          await window.ethereum.request({ method: 'eth_requestAccounts' })

          // Create a new instance of Web3 using MetaMask's provider
          const web3Instance = new Web3(window.ethereum)

          // Get the user's accounts and set the first one as the default
          const accounts = await web3Instance.eth.getAccounts()
          setUserAccount(accounts[0])

          // Initialize the contract with the factory address and ABI
          const contract = new web3Instance.eth.Contract(FactoryABI, privateFactory)
          setPrivateFactoryContract(contract)
        } else {
          console.error('No Ethereum provider detected. Please install MetaMask.')
        }
      } catch (error) {
        console.error('Error initializing Web3 or contract:', error)
      }
    }

    initializeWeb3()
  }, [])

  // Function to handle oracle deployment
  const deployPrivateOracle = async () => {
    try {
      if (!privateFactoryContract) {
        throw new Error('Private Factory Contract is not initialized.')
      }
      if (!userAccount) {
        throw new Error('No user account detected. Please connect to MetaMask.')
      }

      // Call the method on the contract instance
      await privateFactoryContract.methods.deploySignumFlexPrivate().send({ from: userAccount })
      console.log('Private Oracle deployed successfully!')
    } catch (error) {
      console.error('Error deploying Private Oracle:', error)
    }
  }

  // Function to handle connection to the Flex contract
  const connectToFlexContract = async () => {
  try {
    if (!oracleAddress) {
      throw new Error('No oracle address provided.')
    }

    // Initialize Flex contract with the provided oracle address
    const web3Instance = new Web3(window.ethereum)
    const flex = new web3Instance.eth.Contract(FlexABI, oracleAddress)
    setFlexContract(flex)

    // Use an existing method in your ABI to check if contract is connected
    if (flex.methods.owner) { // Example of a method to check connection
      const flexOwner = await flex.methods.owner().call()
      console.log('Flex contract owner :', flexOwner)

      // If the call succeeds, mark as connected
      setIsConnectedToFlex(true)
      console.log('Connected to Flex contract at:', oracleAddress)
    } else {
      console.error('Could not find a valid method to verify connection to Flex contract.')
    }
  } catch (error) {
    console.error('Error connecting to Flex contract:', error)
  }
}

  // Function to update the whitelist (add or remove)
  const updateWhitelist = async (reporterAddress, queryId, status) => {
    try {
      if (!flexContract || !reporterAddress || !queryId) {
        throw new Error('Flex contract not initialized or missing parameters.')
      }

      // Call the updateWhitelist function on the contract
      await flexContract.methods.updateWhitelist(reporterAddress, queryId, status).send({ from: userAccount })
      console.log(`Whitelisted reporter ${status ? 'added' : 'removed'}:`, reporterAddress)
    } catch (error) {
      console.error(`Error ${status ? 'adding' : 'removing'} whitelisted reporter:`, error)
    }
  }

  return (
    <>
      <div className="HeroInnerContainer">
        <h1 className="HeroHeader">Create Private Oracle</h1>
        <div className={'HeroInfoBox'}>
          {userData.currentUser ? (
            <InfoBoxConnected />
          ) : (
            <WalletConnect nav={false} />
          )}
        </div>
        <div
          className="HeroFundFeed"
          style={{
            color: '#fbc51b',
            border: '2px solid #fbc51b',
            cursor: 'pointer'
          }}
          onClick={deployPrivateOracle} // Call deploy function on click
        >
          Deploy Private Oracle
        </div>
        <br />
        <br />
        <br />
        <h1 className="HeroHeader">Manage Private Oracle</h1>
        <p className="HeroInfoBox" style={{ marginBottom: '-50px' }}>
          Input your private oracle address to manage:
        </p>
        <input
          style={{ width: '25vw', marginTop: '45px' }}
          type="text"
          value={oracleAddress}
          onChange={(e) => setOracleAddress(e.target.value)} // Update oracle address from input
          className="HeroParameterFeedNumberInputSmall"
          name="privateOracleAddress"
        />
        <div
          className="HeroFundFeed"
          style={{
            color: '#fbc51b',
            border: '2px solid #fbc51b',
            marginTop: '20px',
            cursor: 'pointer'
          }}
          onClick={connectToFlexContract}
        >
          Manage Private Oracle
        </div>
        {isConnectedToFlex && (
          <div className="FlexManagement" style={{ display: 'contents' }}>
           <br />
           <br />
            <h3>Manage Whitelisted Reporters</h3>
            <input
            className="HeroParameterFeedNumberInputSmall"
              style={{ width: '20vw', marginTop: '10px' }}
              type="text"
              placeholder="Reporter Address"
              id="reporterAddress"
            />
            <input
            className="HeroParameterFeedNumberInputSmall"
              style={{ width: '20vw', marginTop: '10px' }}
              type="text"
              placeholder="QueryID"
              id="queryId"
            />
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
              <div
          className="HeroFundFeed"
          style={{
            width: '145px',
            color: '#fbc51b',
            border: '2px solid #fbc51b',
            marginTop: '20px',
            cursor: 'pointer'
          }}
          onClick={() => {
                  const reporterAddress = document.getElementById('reporterAddress').value
                  const queryId = document.getElementById('queryId').value
                  updateWhitelist(reporterAddress, queryId, true) // Add to whitelist
                }}
        >
          Add Reporter
        </div>
        <div
          className="HeroFundFeed"
          style={{
            width: '145px',
            color: '#fbc51b',
            border: '2px solid #fbc51b',
            marginTop: '20px',
            cursor: 'pointer'
          }}
          onClick={() => {
                  const reporterAddress = document.getElementById('reporterAddress').value
                  const queryId = document.getElementById('queryId').value
                  updateWhitelist(reporterAddress, queryId, false) // Remove from whitelist
                }}
        >
          Remove Reporter
        </div>        
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Hero
