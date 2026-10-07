import React, { useState } from 'react';
import { SystemSettings } from '../../types';
import { AppStorage } from '../../services/storage';
import { Settings, Shield, RefreshCw, Save, Check } from 'lucide-react';

interface SettingsViewProps {
  onResetSeedData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onResetSeedData }) => {
  const [settings, setSettings] = useState<SystemSettings>(AppStorage.getSettings());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    AppStorage.saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <span>ตั้งค่าระบบและเกณฑ์การประเมินความเสี่ยง (System Settings)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ปรับแต่งเกณฑ์ Risk Engine ข้อมูลหน่วยงาน และการเชื่อมโยงระบบภายนอก
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'บันทึกสำเร็จ' : 'บันทึกการตั้งค่า'}</span>
        </button>
      </div>

      {/* Settings Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Office Details */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3 text-xs">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
            ข้อมูลหน่วยงาน
          </h3>

          <div>
            <label className="text-slate-600 font-medium block mb-1">ชื่อหน่วยงาน (ภาษาไทย):</label>
            <input
              type="text"
              value={settings.officeNameTh}
              onChange={(e) => setSettings({ ...settings, officeNameTh: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">ชื่อหน่วยงาน (English):</label>
            <input
              type="text"
              value={settings.officeNameEn}
              onChange={(e) => setSettings({ ...settings, officeNameEn: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">ปีงบประมาณ:</label>
            <input
              type="number"
              value={settings.fiscalYear}
              onChange={(e) => setSettings({ ...settings, fiscalYear: Number(e.target.value) })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        {/* Risk Engine Settings */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3 text-xs">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>เกณฑ์การคำนวณ Risk Engine</span>
          </h3>

          <div>
            <label className="text-rose-700 font-bold block mb-1">Critical (ความเสี่ยงวิกฤต):</label>
            <p className="text-slate-500 text-[11px] mb-1">คำนวณจากงานที่เกินกำหนดส่ง (Overdue)</p>
            <div className="p-2 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-medium">
              ✓ เกินกำหนด = Critical อัตโนมัติ
            </div>
          </div>

          <div>
            <label className="text-orange-700 font-bold block mb-1">High (ความเสี่ยงสูง):</label>
            <div className="flex items-center gap-2">
              <span className="text-slate-600">เหลือเวลาไม่เกิน</span>
              <input
                type="number"
                value={settings.riskThresholds.highDaysLeft}
                onChange={(e) => setSettings({
                  ...settings,
                  riskThresholds: { ...settings.riskThresholds, highDaysLeft: Number(e.target.value) }
                })}
                className="w-20 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold"
              />
              <span className="text-slate-600">วัน</span>
            </div>
          </div>

          <div>
            <label className="text-amber-700 font-bold block mb-1">Medium (ความเสี่ยงปานกลาง):</label>
            <div className="flex items-center gap-2">
              <span className="text-slate-600">เหลือเวลา</span>
              <input
                type="number"
                value={settings.riskThresholds.mediumDaysLeftMin}
                onChange={(e) => setSettings({
                  ...settings,
                  riskThresholds: { ...settings.riskThresholds, mediumDaysLeftMin: Number(e.target.value) }
                })}
                className="w-16 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold"
              />
              <span className="text-slate-600">ถึง</span>
              <input
                type="number"
                value={settings.riskThresholds.mediumDaysLeftMax}
                onChange={(e) => setSettings({
                  ...settings,
                  riskThresholds: { ...settings.riskThresholds, mediumDaysLeftMax: Number(e.target.value) }
                })}
                className="w-16 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold"
              />
              <span className="text-slate-600">วัน</span>
            </div>
          </div>
        </div>
      </div>

      {/* Database Reset Action */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-rose-800 text-xs">คืนค่าข้อมูลตัวอย่าง (Reset Demo Seed Data)</h4>
          <p className="text-[11px] text-rose-600 mt-0.5">
            รีเซ็ตข้อมูลเอกสาร ข้อสั่งการ และงานกลับเป็นค่าเริ่มต้นตาม Mockup
          </p>
        </div>
        <button
          onClick={() => {
            if (window.confirm('คุณต้องการรีเซ็ตข้อมูลตัวอย่างทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่?')) {
              onResetSeedData();
            }
          }}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>รีเซ็ตข้อมูล</span>
        </button>
      </div>
    </div>
  );
};
