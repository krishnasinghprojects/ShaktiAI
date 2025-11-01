import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../components/UI/Icon';

type Timeframe = 'weekly' | 'monthly' | 'yearly';

type Goal = {
  id: string;
  title: string;
  target: number; // in kWh
  current: number;
  points: number;
  completed: boolean;
  icon: string;
  description: string;
};

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  dateUnlocked?: string;
  points: number;
};

const Rewards: React.FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>('weekly');
  const [points, setPoints] = useState(1250);
  const [level, setLevel] = useState(3);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activeTab, setActiveTab] = useState<'goals' | 'rewards' | 'achievements'>('goals');

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const loadGoals = () => {
      const baseGoals: Record<Timeframe, Goal[]> = {
        weekly: [
          { 
            id: 'w1', 
            title: 'Energy Saver', 
            target: 10, 
            current: 6.5, 
            points: 100, 
            completed: false,
            icon: 'zap',
            description: 'Save 10kWh this week'
          },
          { 
            id: 'w2', 
            title: 'Peak Shaver', 
            target: 5, 
            current: 3.2, 
            points: 150, 
            completed: false,
            icon: 'activity',
            description: 'Reduce peak usage by 5kWh'
          },
          { 
            id: 'w3', 
            title: 'Weekend Warrior', 
            target: 15, 
            current: 8, 
            points: 200, 
            completed: false,
            icon: 'calendar',
            description: 'Save 15kWh over the weekend'
          },
        ],
        monthly: [
          { 
            id: 'm1', 
            title: 'Monthly Miser', 
            target: 50, 
            current: 35, 
            points: 500, 
            completed: false,
            icon: 'bar-chart-2',
            description: 'Save 50kWh this month'
          },
          { 
            id: 'm2', 
            title: 'Renewable Champion', 
            target: 30, 
            current: 42, 
            points: 750, 
            completed: true,
            icon: 'sun',
            description: 'Use 30kWh from renewables'
          },
          { 
            id: 'm3', 
            title: 'Consistency King/Queen', 
            target: 100, 
            current: 85, 
            points: 1000, 
            completed: false,
            icon: 'trending-up',
            description: 'Save 100kWh this month'
          },
        ],
        yearly: [
          { 
            id: 'y1', 
            title: 'Annual Super Saver', 
            target: 1000, 
            current: 650, 
            points: 5000, 
            completed: false,
            icon: 'award',
            description: 'Save 1000kWh this year'
          },
          { 
            id: 'y2', 
            title: 'Green Warrior', 
            target: 2000, 
            current: 1800, 
            points: 10000, 
            completed: false,
            icon: 'shield',
            description: 'Save 2000kWh this year'
          },
          { 
            id: 'y3', 
            title: 'Eco Legend', 
            target: 5000, 
            current: 4200, 
            points: 25000, 
            completed: false,
            icon: 'star',
            description: 'Save 5000kWh this year'
          },
        ],
      };
      setGoals(baseGoals[timeframe].map(goal => ({
        ...goal,
        completed: goal.current >= goal.target
      })));
    };

    loadGoals();
  }, [timeframe]);

  // Load achievements
  useEffect(() => {
    const mockAchievements: Achievement[] = [
      { 
        id: 'a1', 
        title: 'First Steps', 
        description: 'Save your first 10kWh', 
        icon: 'award', 
        points: 100,
        unlocked: true, 
        dateUnlocked: '2023-10-15' 
      },
      { 
        id: 'a2', 
        title: 'Eco Warrior', 
        description: 'Reach level 5', 
        icon: 'shield', 
        points: 250,
        unlocked: true, 
        dateUnlocked: '2023-11-20' 
      },
      { 
        id: 'a3', 
        title: 'Weekend Saver', 
        description: 'Complete 5 weekend energy saving challenges', 
        icon: 'calendar', 
        points: 500,
        unlocked: false 
      },
      { 
        id: 'a4', 
        title: 'Power Down Pro', 
        description: 'Reduce peak usage by 20% for a month', 
        icon: 'battery-charging', 
        points: 750,
        unlocked: false 
      },
      { 
        id: 'a5', 
        title: 'Early Bird', 
        description: 'Save energy during peak hours for 7 days straight', 
        icon: 'sunrise', 
        points: 300,
        unlocked: false 
      },
    ];
    setAchievements(mockAchievements);
  }, []);

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const rewards = [
    {
      id: 'r1',
      title: 'Eco-Friendly Water Bottle',
      points: 500,
      icon: 'droplet',
      description: 'Stay hydrated while saving the planet with this reusable bottle.',
      claimed: false
    },
    {
      id: 'r2',
      title: 'Solar Phone Charger',
      points: 1500,
      icon: 'sun',
      description: 'Harness the power of the sun to charge your devices.',
      claimed: false
    },
    {
      id: 'r3',
      title: 'Smart Power Strip',
      points: 3000,
      icon: 'battery-charging',
      description: 'Eliminate phantom power with this smart power strip.',
      claimed: false
    },
  ];

  const handleRedeem = (rewardId: string, requiredPoints: number) => {
    if (points >= requiredPoints) {
      setPoints(prev => prev - requiredPoints);
      // In a real app, you would make an API call here
      alert('Reward redeemed successfully!');
    } else {
      alert('Not enough points to redeem this reward');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl font-heading text-dark-text mb-4 serif-optimized"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Rewards Center
        </motion.h1>
        <motion.p 
          className="text-lg text-dark-textSecondary max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Earn points and achievements by saving energy. Track your progress and unlock rewards as you make a positive impact on the environment.
        </motion.p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Points Card */}
        <motion.div 
          className="glass p-6 rounded-2xl border border-primary/20"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-dark-textSecondary font-accent">Your Points</h3>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="award" size={24} className="text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold text-primary mb-2">{points.toLocaleString()}</div>
          <div className="flex items-center text-sm text-dark-textSecondary">
            <Icon name="zap" size={14} className="mr-1 text-warning" />
            <span>+250 points this month</span>
          </div>
        </motion.div>

        {/* Level Card */}
        <motion.div 
          className="glass p-6 rounded-2xl border border-secondary/20"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-dark-textSecondary font-accent">Your Level</h3>
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Icon name="star" size={24} className="text-secondary" />
            </div>
          </div>
          <div className="text-3xl font-bold text-secondary mb-2">Level {level}</div>
          <div className="w-full bg-dark-surface/20 rounded-full h-2.5 mt-3">
            <div 
              className="bg-secondary h-2.5 rounded-full" 
              style={{ width: '65%' }}
            ></div>
          </div>
          <div className="text-xs text-dark-textSecondary mt-1">65% to next level</div>
        </motion.div>

        {/* Impact Card */}
        <motion.div 
          className="glass p-6 rounded-2xl border border-success/20"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-dark-textSecondary font-accent">Total Energy Saved</h3>
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Icon name="leaf" size={24} className="text-success" />
            </div>
          </div>
          <div className="text-3xl font-bold text-success mb-2">4,200 kWh</div>
          <div className="text-sm text-dark-textSecondary">
            That's like planting <span className="font-medium text-success">50 trees</span>!
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex mb-8 border-b border-dark-surface/20">
        <button
          onClick={() => setActiveTab('goals')}
          className={`px-6 py-3 text-sm font-accent relative ${
            activeTab === 'goals'
              ? 'text-primary border-b-2 border-primary' 
              : 'text-dark-textSecondary hover:text-dark-text'
          }`}
        >
          Goals
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-6 py-3 text-sm font-accent relative ${
            activeTab === 'achievements'
              ? 'text-primary border-b-2 border-primary' 
              : 'text-dark-textSecondary hover:text-dark-text'
          }`}
        >
          Achievements
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-6 py-3 text-sm font-accent relative ${
            activeTab === 'rewards'
              ? 'text-primary border-b-2 border-primary' 
              : 'text-dark-textSecondary hover:text-dark-text'
          }`}
        >
          Available Rewards
        </button>
      </div>

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Timeframe Tabs */}
          <div className="flex mb-6">
            {(['weekly', 'monthly', 'yearly'] as Timeframe[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setTimeframe(tab)}
                className={`px-4 py-2 text-sm font-accent mr-2 rounded-lg ${
                  timeframe === tab
                    ? 'bg-primary/10 text-primary' 
                    : 'text-dark-textSecondary hover:bg-dark-surface/20'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <motion.div 
                key={goal.id}
                className="glass p-6 rounded-2xl border border-dark-surface/20 hover:border-primary/30 transition-colors"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <Icon name={goal.icon as any} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-accent text-dark-text mb-1">{goal.title}</h3>
                    <p className="text-sm text-dark-textSecondary">{goal.description}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {goal.points} pts
                  </div>
                </div>
                
                <div className="w-full bg-dark-surface/20 rounded-full h-2.5 mb-3">
                  <div 
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      goal.completed ? 'bg-success' : 'bg-primary'
                    }`} 
                    style={{ width: `${calculateProgress(goal.current, goal.target)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-dark-textSecondary">
                    {calculateProgress(goal.current, goal.target)}% complete
                  </span>
                  {goal.completed ? (
                    <span className="inline-flex items-center text-xs font-medium text-success">
                      <Icon name="check-circle" size={14} className="mr-1" />
                      Completed
                    </span>
                  ) : (
                    <span className="text-xs text-dark-textSecondary">
                      {goal.target - goal.current > 0 
                        ? `${(goal.target - goal.current).toFixed(1)} kWh to go`
                        : 'Almost there!'}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement) => (
            <motion.div 
              key={achievement.id}
              className={`glass p-6 rounded-2xl border ${
                achievement.unlocked 
                  ? 'border-success/20 bg-success/5' 
                  : 'border-dark-surface/20 opacity-60'
              }`}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${
                  achievement.unlocked 
                    ? 'bg-success/10 text-success' 
                    : 'bg-dark-surface/20 text-dark-textSecondary'
                }`}>
                  <Icon name={achievement.icon as any} size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-accent text-lg ${
                      achievement.unlocked ? 'text-dark-text' : 'text-dark-textSecondary'
                    }`}>
                      {achievement.title}
                    </h4>
                    {achievement.unlocked && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                        +{achievement.points} pts
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-dark-textSecondary mt-1">
                    {achievement.description}
                  </p>
                  {achievement.unlocked && achievement.dateUnlocked && (
                    <p className="text-xs text-success mt-2">
                      Unlocked: {new Date(achievement.dateUnlocked).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rewards.map((reward) => (
            <motion.div 
              key={reward.id}
              className="glass p-6 rounded-2xl border border-dark-surface/20 hover:border-primary/30 transition-colors"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                  <Icon name={reward.icon as any} size={28} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-accent text-dark-text mb-1">{reward.title}</h3>
                  <p className="text-sm text-dark-textSecondary">{reward.points} points</p>
                </div>
              </div>
              
              <p className="text-sm text-dark-textSecondary mb-4">
                {reward.description}
              </p>
              
              <button 
                onClick={() => handleRedeem(reward.id, reward.points)}
                className={`w-full py-2.5 rounded-lg font-accent text-sm ${
                  points >= reward.points
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-dark-surface/20 text-dark-textSecondary cursor-not-allowed'
                }`}
                disabled={points < reward.points}
              >
                {points >= reward.points ? 'Redeem Now' : `Need ${reward.points - points} more pts`}
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Rewards;