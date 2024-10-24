import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {

  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setPrevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  const deletePrompt = (index) => {
    const newPrompts = prevPrompts.filter((_, i) => i !== index);
    setPrevPrompts(newPrompts);
    // Also update localStorage to keep it in sync
    localStorage.setItem("prevPrompts", JSON.stringify(newPrompts));
  }

  return (
    <div className='sidebar'>
      <div className='top'>
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt='' />
        <div onClick={() => newChat()} className='new-chat'>
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended
          ?
          <div className="recent">
            <p className="recent-title">
              Recent
              {prevPrompts.map((item, index) => {
                return (
                  <div key={index} className="recent-entry">
                    <div onClick={() => loadPrompt(item)} className="prompt-text">
                      <img src={assets.message_icon} alt="" />
                      <p>{item.slice(0, 15)}...</p>
                    </div>
                    <img onClick={()=> deletePrompt(index)} className="delete-button" src={assets.delete_icon} alt="" />
                  </div>
                )
              })}
            </p>
          </div>
          : null
        }
      </div>
      <div className='bottom'>
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
