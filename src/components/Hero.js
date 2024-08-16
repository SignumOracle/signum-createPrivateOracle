import React, { useState, useContext, useEffect } from 'react'
//Styles
import '../styles/Hero.css'
//Context
import { UserContext } from '../contexts/User'
//Components
import WalletConnect from './frontendBoilerplate/WalletConnect'
import InfoBoxConnected from './InfoBoxConnected'
//Utils

function Hero() {
  //Context
  const userData = useContext(UserContext)

  return (
    <>
      <div className="HeroInnerContainer" >
      <h1 className="HeroHeader">Create Private Oracle</h1>
      <div
          className={'HeroInfoBox'}
        >
        {userData.currentUser ? (
         <InfoBoxConnected /> 
        ) : (
          <WalletConnect nav={false}   />
        )}       
      </div>
          <div 
            className='HeroFundFeed'
            style={{
              color: '#fbc51b',
              border: '2px solid #fbc51b',
            }}
          >Deploy Private Oracle</div>
          <br />
        <br />
        <br />
        <h1 className="HeroHeader">Manage Private Oracle</h1>
        <p className="HeroInfoBox" style={{
              marginBottom: '-50px'
            }}>Input your private oracle address to manage:</p>
        <input
                style={{
                  width: '25vw',
                  marginTop: '45px'
                }}
                type="text"
                min={0}
                max={64}
                className="HeroParameterFeedNumberInputSmall"
                name="privateOracleAddress"
              />
              <div 
            className='HeroFundFeed'
            style={{
              color: '#fbc51b',
              border: '2px solid #fbc51b',
              marginTop: '20px'
            }}
          >Manage Private Oracle</div>
        </div>
    </>
  )
}

export default Hero