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
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "UMMobClick/MobClick.h"

#import "KTPlay.h"

@implementation AppDelegate
@synthesize bridge = _bridge;


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
  
  [KTPlay startWithAppKey:@"Vvqcxld1n" appSecret:@"e8715672514bee1ab02794cb35f02c4423835ed6"];
  
  KTAvailabilityChangedBlock availabilityChangedBlock =  ^(BOOL isEnabled){
    [self.bridge.eventDispatcher sendAppEventWithName:@"KTPLAY_ENABLE"
                                                 body: isEnabled?@1:@0];
  };
  [KTPlay setAvailabilityChangedBlock: availabilityChangedBlock];
  
  return YES;
}

@end
