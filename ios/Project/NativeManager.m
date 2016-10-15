//
//  NativeManager.m
//  Project
//
//  Created by Song Wt on 16/10/3.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "NativeManager.h"

#import <ShareSDK/ShareSDK.h>
#import <ShareSDKConnector/ShareSDKConnector.h>
#import <ShareSDKExtension/ShareSDK+Extension.h>
#import <ShareSDKExtension/SSEShareHelper.h>

@implementation NativeManager


RCT_EXPORT_METHOD(share:(NSInteger *)type title:(NSString *)title text:(NSString *)text url:(NSString*) url)
{
  [SSEShareHelper screenCaptureShare:^(SSDKImage *image, SSEShareHandler shareHandler) {
    NSMutableDictionary *shareParams = [NSMutableDictionary dictionary];
    [shareParams SSDKSetupShareParamsByText:@"" images:image url:[NSURL URLWithString:url] title:title type:SSDKContentTypeImage];
    shareHandler(type, shareParams);
  } onStateChanged:^(SSDKResponseState state, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error) {
//    NSLog(@"%lu", (unsigned long)state);
  }];
}

RCT_EXPORT_METHOD(isInstall:(NSInteger *)type callback:(RCTResponseSenderBlock)callback)
{
  callback(@[ [ShareSDK isClientInstalled:type] ? @1 : @0  ]);
}

RCT_EXPORT_MODULE();

@end
