import { useState, useEffect, useCallback, useRef } from 'react';
import { hapticSuccess } from '../utils/mobile';

/**
 * Pull-to-Refresh Hook
 * Implements native-like pull-to-refresh functionality
 * 
 * Usage:
 * const { pulling, refreshing } = usePullToRefresh(async () => {
 *   await fetchData();
 * });
 */
export function usePullToRefresh(onRefresh, threshold = 80) {
  const [pulling, setPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  const startY = useRef(0);
  const currentY = useRef(0);
  const isPulling = useRef(false);

  const handleTouchStart = useCallback((e) => {
    // Only start if at top of page
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isPulling.current) return;
    
    currentY.current = e.touches[0].clientY;
    const distance = currentY.current - startY.current;
    
    // Only pull down
    if (distance > 0) {
      setPullDistance(Math.min(distance, threshold * 2));
      
      if (distance > threshold) {
        setPulling(true);
      } else {
        setPulling(false);
      }
      
      // Prevent default scroll if pulling
      if (distance > 10) {
        e.preventDefault();
      }
    }
  }, [threshold]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling.current) return;
    
    isPulling.current = false;
    
    if (pulling && !refreshing) {
      setRefreshing(true);
      setPullDistance(0);
      
      // Haptic feedback
      await hapticSuccess();
      
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh error:', error);
      } finally {
        setRefreshing(false);
        setPulling(false);
      }
    } else {
      setPullDistance(0);
      setPulling(false);
    }
  }, [pulling, refreshing, onRefresh]);

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    pulling,
    refreshing,
    pullDistance
  };
}

/**
 * Pull-to-Refresh Indicator Component
 */
export function PullToRefreshIndicator({ pulling, refreshing, pullDistance }) {
  if (!pulling && !refreshing) return null;
  
  return (
    <div 
      className="ptr-indicator"
      style={{
        transform: `translateX(-50%) translateY(${pullDistance * 0.5}px)`,
        opacity: refreshing ? 1 : Math.min(pullDistance / 80, 1)
      }}
    >
      {refreshing ? (
        <div className="animate-spin">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      ) : (
        <div style={{ transform: `rotate(${pullDistance * 3}deg)` }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14m-7-7l7 7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}

export default usePullToRefresh;
