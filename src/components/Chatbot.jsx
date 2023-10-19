'use client'
import React, { useEffect } from 'react';

function Chatbot() {
  useEffect(() => {
      // Ensure the script hasn't already been added
      if (!document.getElementById('voiceflow-script')) {
          const scriptElem = document.createElement('script');
          scriptElem.id = 'voiceflow-script';
          scriptElem.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
          scriptElem.type = "text/javascript";
          scriptElem.onload = () => {
              window.voiceflow.chat.load({
                  verify: { projectID: '652da078cde70b0008e1c5de' },
                  url: 'https://general-runtime.voiceflow.com',
                  versionID: 'production'
              });
          };

          // Insert the script element to the DOM
          const firstScriptElem = document.getElementsByTagName('script')[0];
          firstScriptElem.parentNode.insertBefore(scriptElem, firstScriptElem);
      }
  }, []); // Empty dependency array ensures this runs once after component mount

}

export default  Chatbot