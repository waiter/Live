/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "UMMobClick/MobClick.h"

#import <ShareSDK/ShareSDK.h>
#import <ShareSDKConnector/ShareSDKConnector.h>

//微信SDK头文件
#import "WXApi.h"

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Project"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // umeng
  UMConfigInstance.appKey = @"57f33eb167e58e5aae00201f";
  UMConfigInstance.channelId = @"App Store";
  
  NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
  [MobClick setAppVersion:version];
  
  [MobClick startWithConfigure:UMConfigInstance];
  
  [ShareSDK registerApp:@"179d666aa99f4" activePlatforms:@[
                                                           @(SSDKPlatformTypeWechat),
                                                           @(SSDKPlatformTypeFacebook)
                                                           ] onImport:^(SSDKPlatformType platformType) {
    switch (platformType)
    {
      case SSDKPlatformTypeWechat:
        [ShareSDKConnector connectWeChat:[WXApi class]];
        break;
      default:
        break;
    }
  } onConfiguration:^(SSDKPlatformType platformType, NSMutableDictionary *appInfo) {
    switch (platformType) {
      case SSDKPlatformTypeWechat:
        [appInfo SSDKSetupWeChatByAppId:@"wx2de1d3e70f9db438"
                              appSecret:@"e5e70b8c72b4251f0180ff5ea18f239d"];
        break;
      case SSDKPlatformTypeFacebook:
        [appInfo SSDKSetupFacebookByApiKey:@"308094676233174" appSecret:@"78bac757c6c5126ed780dfb0bb3c24e2" authType:SSDKAuthTypeBoth];
        break;
      default:
        break;
    }
  }];
  
  return YES;
}

@end
