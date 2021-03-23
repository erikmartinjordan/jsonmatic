import React, { useEffect, useState } from 'react';
import FingerprintJS                  from '@fingerprintjs/fingerprintjs';
import moment                         from 'moment';    
import firebase                       from './Firebase';

const Analytics = () => {
    
    useEffect(() => {
        
        (async () => {
            
            const fp = await FingerprintJS.load();
            
            const result = await fp.get();
            
            const visitorId = result.visitorId;
            
            const today = moment().format('YYYYMMDD hh:mm:ss SSS');
            
            const db = firebase.firestore();
            
            db.collection('analytics').doc(today).set({
                
                [visitorId]: {
                    visited: true
                }
                
            }); 
            
        })();   
        
    }, []);
    
    return null;
    
}

export default Analytics;