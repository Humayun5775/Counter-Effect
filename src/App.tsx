import React from 'react';
import AnimatedCounter from './components/AnimatedCounter';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl shadow-purple-100 space-y-6">
        <h1 className="text-2xl font-semibold text-purple-900 text-center">
          Animated Counter
        </h1>
        <div className="flex items-center justify-center">
          <AnimatedCounter
            initialValue={1}
            min={0}
            max={10}
            onChange={(value) => console.log('New value:', value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;