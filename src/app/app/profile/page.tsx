"use client";

import { useState } from "react";
import { useUserProfile, usePredictions } from "@/hooks";
import { ProfileStats } from "@/components/profile/profile-stats";
import { PredictionHistory } from "@/components/profile/prediction-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FighterCard } from "@/components/fighters/fighter-card";
import LoadingIcon from "@/components/ui/loading-icon";
import { toast } from "sonner";
import { Heart, TrendingUp, Settings } from "lucide-react";

export default function ProfilePage() {
  const { profile, isLoading, error, updateProfile, refreshProfile } = useUserProfile();
  const { refreshPredictions } = usePredictions();
  const [name, setName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  
  // Set initial form values when profile loads
  useState(() => {
    if (profile) {
      setName(profile.name || "");
      setAvatarUrl(profile.avatar || "");
    }
  });
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      const success = await updateProfile({
        name,
        avatar: avatarUrl
      });
      
      if (success) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handlePredictionDelete = () => {
    refreshProfile();
    refreshPredictions();
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingIcon size="lg" />
      </div>
    );
  }
  
  if (error || !profile) {
    return (
      <div className="text-center text-red-500 p-8">
        <p>Error loading profile: {error || "Profile not found"}</p>
        <Button 
          className="mt-4 bg-red-600 hover:bg-red-700" 
          onClick={refreshProfile}
        >
          Retry
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-1/3">
          <Card className="bg-black/70 border-red-500/30">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-red-500/30">
                  <AvatarImage src={profile.avatar || undefined} />
                  <AvatarFallback className="bg-red-950 text-red-200">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{profile.name || "UFC Fan"}</CardTitle>
                  <CardDescription>{profile.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
        
        <div className="w-full md:w-2/3">
          <ProfileStats 
            totalPredictions={profile.stats.totalPredictions}
            correctPredictions={profile.stats.correctPredictions}
            accuracy={profile.stats.accuracy}
            favoritesCount={profile.favorites.length}
          />
        </div>
      </div>
      
      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="bg-black/50 border border-red-500/30">
          <TabsTrigger value="predictions" className="data-[state=active]:bg-red-950/50">
            <TrendingUp className="w-4 h-4 mr-2" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-red-950/50">
            <Heart className="w-4 h-4 mr-2" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-red-950/50">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="predictions" className="mt-6">
          <h2 className="text-xl font-bold mb-4">Your Predictions</h2>
          <PredictionHistory 
            predictions={profile.predictions} 
            onDelete={handlePredictionDelete}
          />
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-6">
          <h2 className="text-xl font-bold mb-4">Favorite Fighters</h2>
          {profile.favorites.length === 0 ? (
            <Card className="bg-black/70 border-red-500/30">
              <CardContent className="p-6 text-center">
                <p className="text-gray-400">You haven&apos;t added any fighters to your favorites yet.</p>
                <Button className="mt-4 bg-red-600 hover:bg-red-700" asChild>
                  <a href="/fighters">Browse Fighters</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {profile.favorites.map((favorite) => {
                return (
                  <FighterCard
                    key={favorite.id}
                    fighter={{
                      FighterId: Number(favorite.fighter.id),
                      FirstName: favorite.fighter.name.split(' ')[0] || null,
                      LastName: favorite.fighter.name.split(' ').slice(1).join(' ') || null,
                      Nickname: favorite.fighter.nickname || null,
                      WeightClass: favorite.fighter.division || null,
                      Wins: Number.parseInt(favorite.fighter.record.split('-')[0] || '0'),
                      Losses: Number.parseInt(favorite.fighter.record.split('-')[1] || '0'),
                      Draws: Number.parseInt(favorite.fighter.record.split('-')[2] || '0'),
                      BirthDate: favorite.fighter.country || null,
                      TitleWins: favorite.fighter.isChampion ? 1 : 0,
                      CareerStats: null
                    }}
                    favoriteId={favorite.id}
                  />
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card className="bg-black/70 border-red-500/30">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your display name"
                    className="bg-black/50 border-red-500/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="bg-black/50 border-red-500/30"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700"
                  disabled={isUpdating}
                >
                  {isUpdating ? <LoadingIcon size="sm" className="mr-2" /> : null}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
