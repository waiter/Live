

/// Copyright © 2016 ktplay. All rights reserved.
/// \file  KTPlay




#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AvailabilityMacros.h>


/**
 *@enum KTInterstitialNotificationEvent
 */

typedef enum{
    KTInterstitialNotificationWillAppear = 1,
    KTInterstitialNotificationDidCancel,
    KTInterstitialNotificationDidFinish
} KTInterstitialNotificationEvent;


@class KTUser;


/**
 * KTRewardItem
 */
@interface KTRewardItem : NSObject

/// reward name
@property (nonatomic,copy) NSString * name;

/// reward id
@property (nonatomic,copy) NSString * typeId;

/// reward value
@property (nonatomic) long long value;

@end


@interface KTReward: NSObject
/// reward array
@property (nonatomic,strong) NSArray<KTRewardItem *> *items;
    
 ///reward identifier
@property (nonatomic,copy) NSString *messageId;
    
///ktplay user id   

@property (nonatomic,copy) NSString *ktUserId;
    
///game user id

@property (nonatomic,copy) NSString *gameUserId;

@end
/**
 *    @brief    rewards callback
 *    @param    rewards array
 *    @see      KTReward
 */

typedef  void (^KTDidDispatchRewardsBlock)(KTReward * reward);

/**
 *    @brief    window appeared  callback
 */
typedef  void (^KTViewDidAppearBlock)();

/**
 *    @brief    window disappeared callback
 */
typedef  void (^KTViewDidDisappearBlock)();

/**
 *    @brief    start playsound callback
 */
typedef  void (^KTSoundStartBlock)();

/**
 *    @brief    stop playsound callback
 */
typedef  void (^KTSoundStopBlock)();

/**
 *    @brief   unread messages callback
 *    @param   hasNewActivity new unread messages
 */

typedef  void (^KTActivityStatusChangedBlock)(BOOL hasNewActivity);

/**
 *    @brief   enable status changes callback
 *    @param   isEnabled  enable status
 */
typedef  void (^KTAvailabilityChangedBlock)(BOOL isEnabled);


/**
 *    @brief   deep link callback
 *    @param   linkScheme  link scheme
 */
typedef void(^KTDeepLinkBlock)(NSString *linkScheme);


/**
 *    @brief   interstitial notification callback
 *    @param   identifier notification trigger point id
 *    @param   notificationEvent notification event
 *    @see     KTInterstitialNotificationEvent
 */
typedef void (^KTInterstitialNotificationBlock)(NSString *identifier,KTInterstitialNotificationEvent notificationEvent);

/**
 * KTPlay
 */
@interface KTPlay : NSObject



/**
 *  @brief Initialize the KTPlay with the appKey and appSecret.
 *  @param appKey appKey
 *  @param appSecret appSecret
 */



+(void)startWithAppKey:(NSString *)appKey appSecret:(NSString *)appSecret;



/**
 *  @brief show community window
 */
+(void)show;

/**
 *  @brief dismiss community window
 */

+(void)dismiss;

/**
 *  @brief show quick share  window
 *  @param imagePath image local path
 *  @param title topic tilte [optional]
 *  @param description topic description [optional]
 */


+(void)shareImageToKT:(NSString *)imagePath title:(NSString *)title description:(NSString *)description;


/**
 *  @brief  setup listener for reward sending event
 *  @param block rewards callback
 *  @see KTDidDispatchRewardsBlock
 *  @note
 *
 *  Reward callback handler<br/>
 *
 *  1.For Single Player Game<br/>
 *      The callback will invoke and execute reward handling logic of game client with
 *      the reward stated by the item<br/>
 *  2.For online game and require server validation<br/>
 *      The callback will initiate server side reward validation by passing parameters:
 *      messageId，ktUserId，gameUserId to their game server and that their game server
 *      will in turn talk to KTplay Open API to verify if the reward is valid. After
 *      validation, either the game server or game client will execute reward handling.<br/>
 */
+(void)setDidDispatchRewardsBlock:(KTDidDispatchRewardsBlock)block;


/**
 *  @brief  setup listener for window appeared event
 *  @param block window appeared callback
 *  @see KTViewDidAppearBlock
 */

+(void)setViewDidAppearBlock:(KTViewDidAppearBlock)block;


/**
 *  @brief  setup listener for window disappeared event
 *  @param block window disappeared callback
 *  @see KTViewDidDisappearBlock
 */

+(void)setViewDidDisappearBlock:(KTViewDidDisappearBlock)block;


/**
 *  @brief  setup listener for unread messages event
 *  @param block unread messages callback
 *  @see KTActivityStatusChangedBlock
 */

+(void)setActivityStatusChangedBlock:(KTActivityStatusChangedBlock)block;

/**
 *  @brief setup listener for enabled status changes event
 *  @param block enable status changes callback
 *  @see KTAvailabilityChangedBlock
 */

+(void)setAvailabilityChangedBlock:(KTAvailabilityChangedBlock)block;

/**
 *  @brief setup listener for deepLinks event
 *  @param block deep link callback
 *  @see KTDeepLinkBlock
 */

+(void)setDeepLinkBlock:(KTDeepLinkBlock)block;

/**
 * @brief check if ktplay is enabled
 * @return ktplay is enabled
 *
 *  - SDK mayed disabled in following：<br/>
 *  -1 Device is not supported by KTplay SDK <br/>
 *  -2 SDK features disabled in KTplay developer portal <br/>
 *  -3 Network not available <br/>
 */


+(BOOL)isEnabled;


/**
 * @brief check window is opened
 * @return window is opened
 *
 */

+(BOOL)isShowing;

/**
 * @brief set screenshot rotation
 * @param degrees degrees
 */




+(void)handleOpenURL:(NSURL *)url;


/**
 * @brief enable or disable notification,default is enabled
 * @param enabled enabled
 */

+(void)setNotificationEnabled:(BOOL)enabled;



/**
 *  @brief show interstital notification window
 *  @param identifier notification trigger point id
 *  @param interstitial notification callback
 *  @see KTInterstitialNotificationBlock
 */
+(void)showInterstitialNotification:(NSString *)identifier  notificationBlock:(KTInterstitialNotificationBlock)block;


/**
 *  @brief load interstital notification data
 *  @param identifier notification trigger point id
 */
+(void)requestInterstitialNotification:(NSString *)identifier;


/**
 *  @brief check if a specifed interstital notification is downloaded.
 *  @param identifier notification trigger point id
 */
+(BOOL)hasInterstitialNotification:(NSString *)identifier;



/**
 *  @brief show quick share  window
 *  @param videoPath video file local path [optional]
 *  @param title topic tilte [require]
 *  @param description topic description [optional]
 */



+(void) shareVideoToKT:(NSString*)videoPath title:(NSString *)title description:(NSString*)description;

/**
 *  @brief setup listener for start playsound event
 *  @param block start playsound callback
 *  @see KTSoundStartBlock
 */

+(void)setSoundStartBlock:(KTSoundStartBlock)block;


/**
 *  @brief setup listener for stop playsound event
 *  @param block stop playsound callback
 *  @see KTSoundStopBlock
 */
+(void)setSoundStopBlock:(KTSoundStopBlock)block;




/**
 * set KTplay Community language, with the parameters format of LanguageCode-LanguageScript-RegionCode，where the LanguageCode is mandatory field，LanguageScript and RegionCode are optional。e.g. acceptable format are zh-Hant-HK，zh-Hans，zh-CN，zh。<br/>
 * LanguageCode ISO-639-1 2 digits language code, e.g. zh，en。<br/>
 * LanguageScript ISO-15924 4 digits language script，e.g. Hans，Hant。<br/>
 * RegionCode ISO-3166-1 2 digits region code, e.g. CN, US
 * @param preferredLanguage, preferred Language。
 * @param alternateLanguage, Alternative language, optional, will be used when preferred language is not supported in the device, if alternative language is also not supported, then community will use the device's system language。
 * @return if set language success
 */

+ (BOOL)setLanguage:(NSString *)preferredLanguage alternateLanguage:(
                                  NSString *)alternateLanguage;

/**
 * open Deeplink
 * @param deepLinkId Deeplink ID
 */
+ (void) openDeepLink:(NSString *)deepLinkId;


@end
