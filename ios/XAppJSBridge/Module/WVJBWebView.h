/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <React/RCTView.h>

// cod start
#import "WebViewJavascriptBridge.h"
//#import <PAFFJSSDK/PAFFJavascriptBridge.h>
// code end


@class WVJBWebView;

/**
 * Special scheme used to pass messages to the injectedJavaScript
 * code without triggering a page load. Usage:
 *
 *   window.location.href = RCTJSNavigationScheme + '://hello'
 */


extern NSString *const WVJBJSNavigationScheme;

@protocol WVJBWebViewDelegate <NSObject>

- (BOOL)webView:(WVJBWebView *)webView
shouldStartLoadForRequest:(NSMutableDictionary<NSString *, id> *)request
   withCallback:(RCTDirectEventBlock)callback;

@end

@interface WVJBWebView : RCTView

@property (nonatomic, weak) id<WVJBWebViewDelegate> delegate;

@property (nonatomic, copy) NSDictionary *source;
@property (nonatomic, assign) UIEdgeInsets contentInset;
@property (nonatomic, assign) BOOL automaticallyAdjustContentInsets;
@property (nonatomic, assign) BOOL messagingEnabled;
@property (nonatomic, copy) NSString *injectedJavaScript;
@property (nonatomic, assign) BOOL scalesPageToFit;

- (void)goForward;
- (void)goBack;
- (void)reload;
- (void)stopLoading;
- (void)postMessage:(NSString *)message;
- (void)injectJavaScript:(NSString *)script;
  
//code start
  
@property(nonatomic, copy) RCTBubblingEventBlock onBridgeHandle;
@property(nonatomic, copy) RCTBubblingEventBlock onBridgeRequest;
@property(nonatomic, strong) NSMutableDictionary *responseCallbacks;
@property(nonatomic, assign) int responseCallbackId;
    
-(void) registerHandler:(NSString*)handlerName handler:(WVJBHandler)handler;
-(void) callHandler:(NSString *) handlerName data:(NSDictionary *) data responseCallback:(WVJBResponseCallback)responseCallback;
  
//code end

@end
