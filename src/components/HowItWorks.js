import React from 'react'
import '../styles/HowItWorks.css'

export default function HowItWorks() {
  return (
    <div className="wrapper">
      <h1 className="subtitle2l"> *Active Networks:<br></br> <span className="subtitle2w">Pulsechain </span></h1>
      <h1 className="title">How It Works</h1>
      <div className='mainText' >
       Create your private oracle, granting access to unlimited reports (no reporter lock), and whitelisted reporters (prevents bad actors from reporting bad data).
          <br></br>
          <br></br>
          <div className="subtitle2">Steps: </div> 
          - 1000 DAI Creation Fee<br />
          - Whitelist Reporter.<br />
          - Update Signum-Feeds.<br />
          - Stake Tokens.<br />
          - Report Data!<br />
        <div>
          <br></br>
          <div className="subtitle2">To create your private oracle:</div> <li>Connect wallet to Pulsechain Mainnet</li> 
          <li>Approve DAI Spend (1000 DAI)</li>
          <li>Deploy Private Oracle</li>

          <br></br>
          <p className='mainText' >Still have questions? Join our{' '}
            <a 
              href="https://t.me/GoSignum"
              target="_blank"
              rel="noopener noreferrer"
            >
            Telegram!
            </a>
          </p>
        </div>
      </div>
     
        <div className='infoContainer'>
          <a className='infoLink' target="_blank" rel="noreferrer" href="https://docs.signum.run">
            <button className='infoButtons'>Docs</button>
          </a>
          <a className='infoLink' target="_blank" rel="noreferrer" href="https://t.me/GoSignum">
            <button className='infoButtons'>Telegram</button>
          </a>
        </div>
    </div>
  )
}
