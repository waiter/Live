/// Copyright © 2016 ktplay. All rights reserved.
/// \file  KTUser

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "KTPlay.h"

/**
 * KTUser
 */
@interface KTUser : NSObject

///user id
@property (nonatomic, copy) NSString * userId;

///user avatar url, you must append a size definition to the url when request an image.
///availabe size are _32x32,_50x50,_64x64,_80x80,_120x120,_128x128,_200x200,_256x256。
@property (nonatomic, copy) NSString * headerUrl;

///user nickname
@property (nonatomic, copy) NSString * nickname;

///gender  0:Not set;1:male;2:female.
@property (nonatomic) NSInteger  gender;

///city
@property (nonatomic, copy) NSString * city;

///leaderboard display score,only available for leaderboard user
@property (nonatomic, copy) NSString * score;

///leaderboard rank,only available for leaderboard user
@property (nonatomic) long long rank;

///preserved
@property (nonatomic,copy) NSString * snsUserId;

///preserved
@property (nonatomic,copy) NSString * loginType;

///game user id,only available for leaderboard user
@property (nonatomic,copy) NSString * gameUserId;

///the flag to indicate if nickname is auto-generated.
@property (nonatomic,assign) BOOL needPresentNickname;

///leaderboard score value,only available for leaderboard user
@property (nonatomic) long long originScore;

///leaderboard score tag,only available for leaderboard user
@property(nonatomic,copy)NSString * scoreTag;

@end


