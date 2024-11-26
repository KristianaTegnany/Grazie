package fr.grazie.gigi

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen;
import android.view.WindowManager;

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Grazie"

  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this, true)
    super.onCreate(null)
    //TODO
    //getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
    
    hideSystemUI()
  }

  override fun onResume() {
    super.onResume()
    updateUI()
  }

  fun updateUI() {
    @Suppress("DEPRECATION")
    window.decorView.setOnSystemUiVisibilityChangeListener { visibility ->
        if (visibility and View.SYSTEM_UI_FLAG_FULLSCREEN == 0) {
            hideSystemUI()
        }
    }
  }

  override fun onWindowFocusChanged(hasFocus: Boolean) {
    super.onWindowFocusChanged(hasFocus)
    if (hasFocus) hideSystemUI()
  }

  fun hideSystemUI() {
    @Suppress("DEPRECATION")
    window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY)
  }
  
  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
