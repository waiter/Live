/// Copyright © 2016 ktplay. All rights reserved.
/// \file  KTAccountManager

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@class KTUser;


/**
 *    @brief    user login status changed callback
 *    @param    isLoggedIn  login status
 *    @param    account user info
 */

typedef  void (^KTLoginStatusChangedBlock)(BOOL isLoggedIn, KTUser * account);

/**
 *    @brief    update profile callback
 *    @param    isSuccess  request is successed
 *    @param    user       user info
 *    @param    error      error info
 */


typedef  void (^KTUpdateProfileBlock)(BOOL isSuccess, KTUser *user, NSError *error);


@interface KTAccountManager : NSObject


/**
 * @brief login with game user
 * @param gameUserId game user id
 * @param success success callback
 * @param failure failure callback
 * @see KTUser
 */
+(void)loginWithGameUser:(NSString *)gameUserId success:(void (^)(KTUser *user))success failure:(void (^)(NSError *error))failure;




+(void)setNickname:(NSString *)nickname  success:(void (^)(KTUser *user))success failure:(void (^)(NSError *error))failure; //deprecated


/**
 * @brief logout
 */

+(void)logout;



/**
 * @brief setup listener for  User login status changed event
 * @param block  User login status changed event callback
 * @see KTLoginStatusChangedBlock
 */




+(void)setLoginStatusChangedBlock:(KTLoginStatusChangedBlock)block ;




/**
 * @brief show login window
 * @param closeable  The login window is closeable or not
 * @param success success callback
 * @param failure failure callback
 * @see KTUser
 */



+(void)showLoginView:(BOOL)closeable success:(void (^)( KTUser * account))success
             failure:(void (^)(NSError *error))failure;



/**
 * @brief get user profile
 * @param userId  user id
 * @param success success callback
 * @param failure failure callback
 * @see KTUser
 */


+(void)userProfile:(NSString *)userId success:(void (^)(KTUser * user))success failure:(void(^)(NSError * error))failure;


/**
 * @brief Check if any user is currently logged in.
 * @return Any user is currently logged in
 */

+(BOOL)isLoggedIn;


/**
 * @brief Get user information of currently logged in user
 * @return Information of currently logged in user
 *
 */
+(KTUser *)currentAccount;


/**
 * @brief set account profile
 * @param nickname  ignore nickname changes when set null
 * @param avatarPath ignore avatarPath changes when set null
 * @param gender  0:ignore ; 1:male ;2:female.
 * @param complete updateProfile callback
 * @see KTUpdateProfileCallBack
 */


+(void)updateProfile:(NSString *)nickname avatarPath:(NSString *)avatarPath gender:(int)gender complete:(KTUpdateProfileBlock)complete;




@end
