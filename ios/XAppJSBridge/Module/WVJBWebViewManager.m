/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "WVJBWebViewManager.h"

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/UIView+React.h>
#import <React/RCTUIManagerUtils.h>

#import "WVJBWebView.h"


@interface WVJBWebViewManager () <WVJBWebViewDelegate>

@end

@implementation WVJBWebViewManager
{
  NSConditionLock *_shouldStartLoadLock;
  BOOL _shouldStartLoad;
}

RCT_EXPORT_MODULE()

- (UIView *)view
{
  WVJBWebView *webView = [WVJBWebView new];
  webView.delegate = self;
  return webView;
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary)
RCT_REMAP_VIEW_PROPERTY(bounces, _webView.scrollView.bounces, BOOL)
RCT_REMAP_VIEW_PROPERTY(scrollEnabled, _webView.scrollView.scrollEnabled, BOOL)
RCT_REMAP_VIEW_PROPERTY(decelerationRate, _webView.scrollView.decelerationRate, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(scalesPageToFit, BOOL)
RCT_EXPORT_VIEW_PROPERTY(messagingEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(injectedJavaScript, NSString)
RCT_EXPORT_VIEW_PROPERTY(contentInset, UIEdgeInsets)
RCT_EXPORT_VIEW_PROPERTY(automaticallyAdjustContentInsets, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onLoadingStart, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadingFinish, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadingError, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMessage, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onShouldStartLoadWithRequest, RCTDirectEventBlock)
RCT_REMAP_VIEW_PROPERTY(allowsInlineMediaPlayback, _webView.allowsInlineMediaPlayback, BOOL)
RCT_REMAP_VIEW_PROPERTY(mediaPlaybackRequiresUserAction, _webView.mediaPlaybackRequiresUserAction, BOOL)
RCT_REMAP_VIEW_PROPERTY(dataDetectorTypes, _webView.dataDetectorTypes, UIDataDetectorTypes)

  //code start
  
  RCT_EXPORT_VIEW_PROPERTY(onBridgeHandle, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onBridgeRequest, RCTBubblingEventBlock)
  
   
  
  
  RCT_EXPORT_METHOD(callResponse:(nonnull NSNumber *)reactTag data:(NSString *) data responseCallbackId:(int) responseCallbackId) {
      [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, WVJBWebView *> *viewRegistry) {
          WVJBWebView *view = viewRegistry[reactTag];
          if (![view isKindOfClass:[WVJBWebView class]]) {
              RCTLogError(@"Invalid view returned from registry, expecting WVJBWebView, got: %@", view);
          } else {
              WVJBWebView *webView = (WVJBWebView *) view;
              WVJBResponseCallback callback = webView.responseCallbacks[@(responseCallbackId)];
              id jsonData = data?[NSJSONSerialization JSONObjectWithData:[data dataUsingEncoding:NSUTF8StringEncoding] options:0 error:0]:nil;
              if (callback) {
                  callback(jsonData);
                  [webView.responseCallbacks removeObjectForKey:@(responseCallbackId)];
              }
          }
      }];
  }
  
  RCT_EXPORT_METHOD(registerHandler:(nonnull NSNumber *)reactTag handlerName:(NSString*)handlerName callbackId:(int) callbackId) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, WVJBWebView *> *viewRegistry) {
      WVJBWebView *view = viewRegistry[reactTag];
      if (![view isKindOfClass:[WVJBWebView class]]) {
        RCTLogError(@"Invalid view returned from registry, expecting WVJBWebView, got: %@", view);
      } else {
        __weak typeof(WVJBWebView *) v = (WVJBWebView *) view;
        [v registerHandler:handlerName handler:^(id data, WVJBResponseCallback responseCallback) {
            dispatch_async(RCTGetUIManagerQueue(), ^{
                __strong __typeof(WVJBWebView *)  webView = (WVJBWebView *) v;
                int responseCallbackId = webView.responseCallbackId++;
                webView.responseCallbacks[@(responseCallbackId)] = responseCallback;
                NSData *jsonData = data?[NSJSONSerialization dataWithJSONObject:data options:0 error:nil]:nil;
                NSString *dataString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
                dataString = dataString.length ? dataString : @"{}";
                webView.onBridgeRequest(@{
                                          @"requestCallbackId" : @(callbackId),
                                          @"responseCallbackId" : @(responseCallbackId),
                                          @"data" : dataString});
            });
        }];
      }
    }];
  }
  
  RCT_EXPORT_METHOD(callHandler:(nonnull NSNumber *)reactTag handlerName:(NSString *) handlerName data:(NSString*) data callbackId:(int) callbackId) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, WVJBWebView *> *viewRegistry) {
      WVJBWebView *view = viewRegistry[reactTag];
      if (![view isKindOfClass:[WVJBWebView class]]) {
        RCTLogError(@"Invalid view returned from registry, expecting WVJBWebView, got: %@", view);
      } else {
        WVJBWebView *webView = (WVJBWebView *) view;
        id jsonData = [NSJSONSerialization JSONObjectWithData:[data dataUsingEncoding:NSUTF8StringEncoding] options:0 error:0];
        [webView callHandler:handlerName data:jsonData responseCallback:^(id responseData) {
            id jsonData = responseData?[NSJSONSerialization JSONObjectWithData:[responseData dataUsingEncoding:NSUTF8StringEncoding] options:0 error:0]:nil;
          webView.onBridgeHandle(@{
                             @"callbackId" : @(callbackId),
                             @"data" : jsonData?:@{}
                             });
        }];
      }
    }];
  }
  //code end
  
RCT_EXPORT_METHOD(goBack:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, WVJBWebView *> *viewRegistry) {
    WVJBWebView *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[WVJBWebView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting UIWebView, got: %@", view);
    } else {
      [view goBack];
    }
  }];
}

RCT_EXPORT_METHOD(goForward:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, WVJBWebView *> *viewRegistry) {
    WVJBWebView *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[WVJBWebView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting UIWebView, got: %@", view);
    } else {
      [view goForward];
    }
  }];
}

RCT_EXPORT_METHOD(reload:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, WVJBWebView *> *viewRegistry) {
    WVJBWebView *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[WVJBWebView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting JBWebView, got: %@", view);
    } else {
      [view reload];
    }
  }];
}

RCT_EXPORT_METHOD(stopLoading:(nonnull NSNumber *)reactTag)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, WVJBWebView *> *viewRegistry) {
    WVJBWebView *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[WVJBWebView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting WVJBWebView, got: %@", view);
    } else {
      [view stopLoading];
    }
  }];
}

RCT_EXPORT_METHOD(postMessage:(nonnull NSNumber *)reactTag message:(NSString *)message)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, WVJBWebView *> *viewRegistry) {
    WVJBWebView *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[WVJBWebView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting WVJBWebView, got: %@", view);
    } else {
      [view postMessage:message];
    }
  }];
}

RCT_EXPORT_METHOD(injectJavaScript:(nonnull NSNumber *)reactTag script:(NSString *)script)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, WVJBWebView *> *viewRegistry) {
    WVJBWebView *view = viewRegistry[reactTag];
    if (![view isKindOfClass:[WVJBWebView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting JBWebView, got: %@", view);
    } else {
      [view injectJavaScript:script];
    }
  }];
}

#pragma mark - Exported synchronous methods

- (BOOL)webView:(__unused WVJBWebView *)webView
shouldStartLoadForRequest:(NSMutableDictionary<NSString *, id> *)request
   withCallback:(RCTDirectEventBlock)callback
{
  _shouldStartLoadLock = [[NSConditionLock alloc] initWithCondition:arc4random()];
  _shouldStartLoad = YES;
  request[@"lockIdentifier"] = @(_shouldStartLoadLock.condition);
  callback(request);

  // Block the main thread for a maximum of 250ms until the JS thread returns
  if ([_shouldStartLoadLock lockWhenCondition:0 beforeDate:[NSDate dateWithTimeIntervalSinceNow:.25]]) {
    BOOL returnValue = _shouldStartLoad;
    [_shouldStartLoadLock unlock];
    _shouldStartLoadLock = nil;
    return returnValue;
  } else {
    RCTLogWarn(@"Did not receive response to shouldStartLoad in time, defaulting to YES");
    return YES;
  }
}

RCT_EXPORT_METHOD(startLoadWithResult:(BOOL)result lockIdentifier:(NSInteger)lockIdentifier)
{
  if ([_shouldStartLoadLock tryLockWhenCondition:lockIdentifier]) {
    _shouldStartLoad = result;
    [_shouldStartLoadLock unlockWithCondition:0];
  } else {
    RCTLogWarn(@"startLoadWithResult invoked with invalid lockIdentifier: "
               "got %zd, expected %zd", lockIdentifier, _shouldStartLoadLock.condition);
  }
}
    
    

@end
